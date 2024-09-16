import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import { UsersApi } from "../../api/domains/users.api";

export const User = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: user, isLoading, isError, error, } = useQuery({
    queryKey: ["users", id],
    queryFn: () => UsersApi.getUser(id),
  });

  if (isLoading) return <div className="text-center">loading...</div>;
  if (isError) return <div className="text-center text-red-500">Error: {error.message}</div>;

  return (
    <div className="flex flex-col items-center p-4">
      {/* Back Button */}
      <Button
        className="btn mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={() => navigate(-1)}
      >
        Back to List
      </Button>

      {/* User Card */}
      <div className="w-full md:w-1/2 bg-white shadow-xl rounded-lg overflow-hidden">
        {/* User Image */}
        <div className="w-full aspect-w-16 aspect-h-9 overflow-hidden flex justify-center">
          <img
            src={user.image}
            alt={`${user.firstName} ${user.lastName}`}
            className="w-[50%] object-cover"
          />
        </div>

        {/* User Details */}
        <div className="p-4">
          {/* Name and Details */}
          <h1 className="text-2xl font-bold mb-2">{user.firstName} {user.lastName}</h1>
          <p className="text-gray-700 mb-4">{user.email}</p>
          <p className="text-gray-700 mb-4">Username: {user.username}</p>
          <p className="text-gray-700 mb-4">Phone: {user.phone}</p>
          <p className="text-gray-700 mb-4">Age: {user.age}</p>
          <p className="text-gray-700 mb-4">Birth Date: {user.birthDate}</p>
          <p className="text-gray-700 mb-4">Gender: {user.gender}</p>
          <p className="text-gray-700 mb-4">Blood Group: {user.bloodGroup}</p>
          <p className="text-gray-700 mb-4">Height: {user.height} cm</p>
          <p className="text-gray-700 mb-4">Weight: {user.weight} kg</p>
          <p className="text-gray-700 mb-4">Eye Color: {user.eyeColor}</p>

          {/* Address */}
          <div className="mb-4">
            <h3 className="font-semibold">Address:</h3>
            <p className="text-sm">{user.address.address}, {user.address.city}, {user.address.state} {user.address.postalCode}, {user.address.country}</p>
          </div>

          {/* Company */}
          <div className="mb-4">
            <h3 className="font-semibold">Company:</h3>
            <p className="text-sm">{user.company.name}</p>
            <p className="text-sm">Department: {user.company.department}</p>
            <p className="text-sm">Title: {user.company.title}</p>
            <p className="text-sm">Address: {user.company.address.address}, {user.company.address.city}, {user.company.address.state} {user.company.address.postalCode}, {user.company.address.country}</p>
          </div>

          {/* Bank Info */}
          <div className="mb-4">
            <h3 className="font-semibold">Bank Information:</h3>
            <p className="text-sm">Card Number: {user.bank.cardNumber}</p>
            <p className="text-sm">Card Type: {user.bank.cardType}</p>
            <p className="text-sm">Card Expiry: {user.bank.cardExpire}</p>
            <p className="text-sm">Currency: {user.bank.currency}</p>
            <p className="text-sm">IBAN: {user.bank.iban}</p>
          </div>

          {/* Crypto Info */}
          <div className="mb-4">
            <h3 className="font-semibold">Crypto:</h3>
            <p className="text-sm">Coin: {user.crypto.coin}</p>
            <p className="text-sm">Wallet: {user.crypto.wallet}</p>
            <p className="text-sm">Network: {user.crypto.network}</p>
          </div>

          {/* IP Address */}
          <div className="mb-4">
            <h3 className="font-semibold">IP Address:</h3>
            <p className="text-sm">{user.ip}</p>
          </div>

          {/* User Agent */}
          <div className="mb-4">
            <h3 className="font-semibold">User Agent:</h3>
            <p className="text-sm">{user.userAgent}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
