import useAuth from "../../../hooks/useAuth";

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-3">Profile</h2>

      <div className="mt-4">
        <p>
          <strong>Name:</strong> {user?.displayName}
        </p>
        <p>
          <strong>Email:</strong> {user?.email}
        </p>
        <p>
          <strong>Role:</strong> {user?.role}
        </p>
      </div>
    </div>
  );
};

export default Profile;
