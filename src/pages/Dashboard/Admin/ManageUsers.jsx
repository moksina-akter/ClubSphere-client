// import { useEffect, useState } from "react";
// import axios from "axios";
// import useAuth from "../../../hooks/useAuth";

// const ManageUsers = () => {
//   const { firebaseUser } = useAuth();
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const fetchUsers = async () => {
//     if (!firebaseUser) return;

//     setLoading(true);
//     setError("");
//     try {
//       const token = await firebaseUser.getIdToken(true);
//       const res = await axios.get(
//         `${import.meta.env.VITE_LOCALHOST}/admin/users`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setUsers(res.data);
//     } catch (err) {
//       console.error("Fetch users error:", err.response?.data || err.message);
//       setError(
//         err.response?.data?.message ||
//           "Failed to fetch users. Make sure you are logged in as admin."
//       );
//       setUsers([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateRole = async (uid, role) => {
//     if (!firebaseUser) return;
//     setLoading(true);
//     try {
//       const token = await firebaseUser.getIdToken(true);
//       await axios.put(
//         `${import.meta.env.VITE_LOCALHOST}/admin/users/${uid}`,
//         { role },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       fetchUsers();
//     } catch (err) {
//       console.error("Update role error:", err.response?.data || err.message);
//       alert("Failed to update role");
//       setLoading(false);
//     }
//   };

//   const deleteUser = async (uid) => {
//     if (!firebaseUser) return;
//     if (!window.confirm("Are you sure to delete this user?")) return;

//     setLoading(true);
//     try {
//       const token = await firebaseUser.getIdToken(true);
//       await axios.delete(
//         `${import.meta.env.VITE_LOCALHOST}/admin/users/${uid}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       fetchUsers();
//     } catch (err) {
//       console.error("Delete user error:", err.response?.data || err.message);
//       alert("Failed to delete user");
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, [firebaseUser]);

//   if (loading) return <p className="text-center">Loading...</p>;

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-6">Manage Users</h2>
//       {error && <p className="text-red-500 mb-4">{error}</p>}

//       <table className="min-w-full border">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="p-2 border">Name</th>
//             <th className="p-2 border">Email</th>
//             <th className="p-2 border">Role</th>
//             <th className="p-2 border">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.length > 0 ? (
//             users.map((u) => (
//               <tr key={u._id} className="text-center">
//                 <td className="p-2 border">{u.name}</td>
//                 <td className="p-2 border">{u.email}</td>
//                 <td className="p-2 border">{u.role}</td>
//                 <td className="p-2 border space-x-2">
//                   <button
//                     onClick={() => updateRole(u.uid, "clubManager")}
//                     className="px-2 py-1 bg-blue-500 text-white rounded"
//                   >
//                     Manager
//                   </button>
//                   <button
//                     onClick={() => updateRole(u.uid, "admin")}
//                     className="px-2 py-1 bg-green-500 text-white rounded"
//                   >
//                     Admin
//                   </button>
//                   <button
//                     onClick={() => updateRole(u.uid, "member")}
//                     className="px-2 py-1 bg-yellow-500 text-white rounded"
//                   >
//                     Member
//                   </button>
//                   <button
//                     onClick={() => deleteUser(u.uid)}
//                     className="px-2 py-1 bg-red-500 text-white rounded"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan={4} className="p-4">
//                 No users found
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ManageUsers;
//----------------------------------------
import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";

const ManageUsers = () => {
  const { firebaseUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    if (!firebaseUser) return;
    setLoading(true);
    setError("");
    try {
      const token = await firebaseUser.getIdToken();
      const res = await axios.get(
        `${import.meta.env.VITE_LOCALHOST}/admin/users`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUsers(res.data);
    } catch (err) {
      console.error(err.response?.data || err.message);
      setError(err.response?.data?.message || "Failed to fetch users");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const updateRole = async (uid, role) => {
    if (!firebaseUser) return;
    setLoading(true);
    try {
      const token = await firebaseUser.getIdToken();
      await axios.put(
        `${import.meta.env.VITE_LOCALHOST}/admin/users/${uid}`,
        { role },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchUsers();
    } catch (err) {
      console.error("Update role error:", err.response?.data || err.message);
      alert("Failed to update role");
      setLoading(false);
    }
  };

  const deleteUser = async (uid) => {
    if (!firebaseUser) return;
    if (!window.confirm("Are you sure to delete this user?")) return;

    setLoading(true);
    try {
      const token = await firebaseUser.getIdToken();
      await axios.delete(
        `${import.meta.env.VITE_LOCALHOST}/admin/users/${uid}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchUsers();
    } catch (err) {
      console.error("Delete user error:", err.response?.data || err.message);
      alert("Failed to delete user");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (firebaseUser?.email) fetchUsers();
  }, [firebaseUser]);

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Manage Users</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <table className="min-w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Role</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((u) => (
              <tr key={u._id} className="text-center">
                <td className="p-2 border">{u.name}</td>
                <td className="p-2 border">{u.email}</td>
                <td className="p-2 border">{u.role}</td>
                <td className="p-2 border space-x-2">
                  <button
                    onClick={() => updateRole(u.uid, "manager")}
                    className="px-2 py-1 bg-blue-500 text-white rounded"
                  >
                    Manager
                  </button>
                  <button
                    onClick={() => updateRole(u.uid, "admin")}
                    className="px-2 py-1 bg-green-500 text-white rounded"
                  >
                    Admin
                  </button>
                  <button
                    onClick={() => updateRole(u.uid, "member")}
                    className="px-2 py-1 bg-yellow-500 text-white rounded"
                  >
                    Member
                  </button>
                  <button
                    onClick={() => deleteUser(u.uid)}
                    className="px-2 py-1 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="p-4">
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
