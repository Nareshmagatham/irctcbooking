from rest_framework import generics, status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from django.db import transaction
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User, Train, Booking
from .serializers import UserSerializer, TrainSerializer, BookingSerializer
from .permissions import IsAdmin

# Register User View
class RegisterUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

# Login User View
class LoginUserView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user is not None:
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            })
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

# Add Train View (Admin Only)
class AddTrainView(APIView):
    permission_classes = [IsAdmin]

    def post(self, request):
        serializer = TrainSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Get Seat Availability View
class GetSeatAvailabilityView(APIView):
    def get(self, request, source, destination):
        trains = Train.objects.filter(source=source, destination=destination)
        serializer = TrainSerializer(trains, many=True)
        return Response(serializer.data)

# Book Seat View
class BookSeatView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    @transaction.atomic
    def post(self, request, train_id):
        try:
            train = Train.objects.select_for_update().get(id=train_id)
            if train.total_seats > 0:
                # Booking logic
                seat_number = train.total_seats
                train.total_seats -= 1
                train.save()
                booking = Booking.objects.create(user=request.user, train=train, seat_number=seat_number)
                return Response({'seat_number': seat_number}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'No seats available'}, status=status.HTTP_400_BAD_REQUEST)
        except Train.DoesNotExist:
            return Response({'error': 'Train not found'}, status=status.HTTP_404_NOT_FOUND)
        except DatabaseError:
            return Response({'error': 'Booking failed'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# Get Booking Details View
class GetBookingDetailsView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, booking_id):
        try:
            booking = Booking.objects.get(id=booking_id, user=request.user)
            serializer = BookingSerializer(booking)
            return Response(serializer.data)
        except Booking.DoesNotExist:
            return Response({'error': 'Booking not found'}, status=status.HTTP_404_NOT_FOUND)
