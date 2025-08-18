import Profile from "@/components/Profile";
import PrivateRoute from "@/wrapper/PrivateRoute";

export default function ProfilePage() {
  return (
    <PrivateRoute>
      <Profile></Profile>
    </PrivateRoute>
  );
}
