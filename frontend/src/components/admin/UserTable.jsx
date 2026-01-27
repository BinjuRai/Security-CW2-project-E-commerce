// "use client"

// import React, { useState, useMemo } from "react"
// import { useNavigate } from "react-router-dom"
// import {
//     Search as SearchIcon,
//     Plus,
//     Eye,
//     Edit,
//     Trash2,
//     Users,
//     AlertCircle,
// } from "lucide-react"

// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     Paper,
//     IconButton,
//     TextField,
//     Typography,
//     Button as MuiButton,
//     Grid,
//     Card as MuiCard,
//     CardContent as MuiCardContent,
//     Dialog,
//     DialogTitle,
//     DialogContent,
//     DialogContentText,
//     DialogActions,
//     CircularProgress,
//     Chip,
//     useTheme,
// } from "@mui/material"

// import { useAdminUser, useDeleteUser } from "../../hooks/admin/useAdminUser"

// export default function UserTable() {
//     const { users = [], isLoading } = useAdminUser()
//     const deleteUserMutation = useDeleteUser()
//     const [deleteId, setDeleteId] = useState(null)
//     const [searchTerm, setSearchTerm] = useState("")
//     const navigate = useNavigate()
//     const theme = useTheme()

//     const filteredUsers = useMemo(() => {
//         return users.filter(
//             (user) =>
//                 user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                 user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                 user.role.toLowerCase().includes(searchTerm.toLowerCase())
//         )
//     }, [users, searchTerm])

//     const handleConfirmDelete = () => {
//         deleteUserMutation.mutate(deleteId, {
//             onSuccess: () => setDeleteId(null),
//             onError: (err) => alert(err.message || "Failed to delete user"),
//         })
//     }

//     const getRoleColor = (role) => {
//         switch (role) {
//             case "admin":
//                 return "error"
//             case "moderator":
//                 return "secondary"
//             default:
//                 return "default"
//         }
//     }

//     const getStatusColor = (status) => {
//         switch (status) {
//             case "active":
//                 return "success"
//             case "inactive":
//                 return "secondary"
//             case "pending":
//                 return "default"
//             default:
//                 return "default"
//         }
//     }

//     return (
//         <div style={{ padding: "24px" }}>
//             <Grid container justifyContent="space-between" alignItems="center" mb={4}>
//                 <Grid item>
//                     <Typography variant="h4" display="flex" alignItems="center" gap={1}>
//                         <Users size={28} /> User Management
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary">
//                         Manage and monitor user accounts across your platform
//                     </Typography>
//                 </Grid>
//                 <Grid item>
//                     <MuiButton
//                         variant="contained"
//                         color="primary"
//                         startIcon={<Plus />}
//                         onClick={() => navigate("/admin/user/create")}
//                     >
//                         Add User
//                     </MuiButton>
//                 </Grid>
//             </Grid>

//             {/* Stats Cards */}
//             <Grid container spacing={2} mb={4}>
//                 {[
//                     { label: "Total Users", value: users.length },
//                     { label: "Active", value: users.filter((u) => u.status === "active").length },
//                     { label: "Pending", value: users.filter((u) => u.status === "pending").length },
//                     { label: "Admins", value: users.filter((u) => u.role === "admin").length },
//                 ].map((stat, index) => (
//                     <Grid item xs={12} sm={6} md={3} key={index}>
//                         <MuiCard>
//                             <MuiCardContent>
//                                 <Typography variant="body2">{stat.label}</Typography>
//                                 <Typography variant="h6">{stat.value}</Typography>
//                             </MuiCardContent>
//                         </MuiCard>
//                     </Grid>
//                 ))}
//             </Grid>

//             {/* Search Field */}
//             <TextField
//                 variant="outlined"
//                 size="small"
//                 placeholder="Search users..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 fullWidth
//                 InputProps={{
//                     startAdornment: <SearchIcon size={16} style={{ marginRight: 8 }} />,
//                 }}
//                 sx={{ mb: 3 }}
//             />

//             {/* Table */}
//             <TableContainer component={Paper} sx={{ bgcolor: theme.palette.background.paper }}>
//                 <Table>
//                     <TableHead>
//                         <TableRow>
//                             <TableCell><strong>User</strong></TableCell>
//                             <TableCell><strong>Role</strong></TableCell>
//                             <TableCell><strong>Status</strong></TableCell>
//                             <TableCell><strong>Created</strong></TableCell>
//                             <TableCell align="right"><strong>Actions</strong></TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {filteredUsers.map((user) => (
//                             <TableRow key={user._id}>
//                                 <TableCell>
//                                     <Typography fontWeight={500}>{user.username}</Typography>
//                                     <Typography variant="body2" color="text.secondary">{user.email}</Typography>
//                                 </TableCell>
//                                 <TableCell>
//                                     <Chip label={user.role} color={getRoleColor(user.role)} size="small" />
//                                 </TableCell>
//                                 <TableCell>
//                                     <Chip label={user.status} color={getStatusColor(user.status)} size="small" />
//                                 </TableCell>
//                                 <TableCell>
//                                     {new Date(user.createdAt).toLocaleDateString()}
//                                 </TableCell>
//                                 <TableCell align="right">
//                                     <IconButton onClick={() => navigate(`/admin/user/${user._id}`)}><Eye size={18} /></IconButton>
//                                     <IconButton onClick={() => navigate(`/admin/user/${user._id}/edit`)}><Edit size={18} /></IconButton>
//                                     <IconButton
//                                         onClick={() => setDeleteId(user._id)}
//                                         disabled={deleteUserMutation.isLoading && deleteId === user._id}
//                                     >
//                                         {deleteUserMutation.isLoading && deleteId === user._id
//                                             ? <CircularProgress size={18} />
//                                             : <Trash2 size={18} />}
//                                     </IconButton>
//                                 </TableCell>
//                             </TableRow>
//                         ))}
//                         {filteredUsers.length === 0 && (
//                             <TableRow>
//                                 <TableCell colSpan={5}>
//                                     <Typography align="center" color="text.secondary">No users found</Typography>
//                                 </TableCell>
//                             </TableRow>
//                         )}
//                     </TableBody>
//                 </Table>
//             </TableContainer>

//             {/* Delete Confirmation Dialog */}
//             <Dialog open={!!deleteId} onClose={() => setDeleteId(null)}>
//                 <DialogTitle>
//                     <AlertCircle style={{ color: "red", marginRight: 8 }} /> Confirm Deletion
//                 </DialogTitle>
//                 <DialogContent>
//                     <DialogContentText>
//                         Are you sure you want to delete this user? This action is permanent.
//                     </DialogContentText>
//                 </DialogContent>
//                 <DialogActions>
//                     <MuiButton onClick={() => setDeleteId(null)}>Cancel</MuiButton>
//                     <MuiButton
//                         color="error"
//                         onClick={handleConfirmDelete}
//                         disabled={deleteUserMutation.isLoading}
//                         startIcon={
//                             deleteUserMutation.isLoading ? (
//                                 <CircularProgress size={16} />
//                             ) : (
//                                 <Trash2 size={16} />
//                             )
//                         }
//                     >
//                         {deleteUserMutation.isLoading ? "Deleting..." : "Delete"}
//                     </MuiButton>
//                 </DialogActions>
//             </Dialog>
//         </div>
//     )
// }
"use client"

import React, { useState, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import {
    Search as SearchIcon,
    Plus,
    Eye,
    Edit,
    Trash2,
    Users,
    ChevronRight,
    ShieldCheck,
    Loader2,
    Filter
} from "lucide-react"
import { useAdminUser, useDeleteUser } from "../../hooks/admin/useAdminUser"
import DeleteModal from "../DeleteModal" // Using the custom protocol modal we designed

export default function UserTable() {
    const { users = [], isLoading } = useAdminUser()
    const deleteUserMutation = useDeleteUser()
    const [deleteId, setDeleteId] = useState(null)
    const [searchTerm, setSearchTerm] = useState("")
    const navigate = useNavigate()

    const filteredUsers = useMemo(() => {
        return users.filter(
            (user) =>
                user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.role.toLowerCase().includes(searchTerm.toLowerCase())
        )
    }, [users, searchTerm])

    const openDeleteModal = (id) => setDeleteId(id)
    const closeDeleteModal = () => setDeleteId(null)

    const handleConfirmDelete = () => {
        deleteUserMutation.mutate(deleteId, {
            onSuccess: () => closeDeleteModal(),
        })
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#fffcfc] flex flex-col justify-center items-center">
                <Loader2 className="w-10 h-10 text-[#f1d1d1] animate-spin mb-4" strokeWidth={1} />
                <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#494040]/40">Synchronizing Registry</p>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#fffcfc] text-[#494040] py-12 px-8 selection:bg-[#f1d1d1]">
            <div className="max-w-[1600px] mx-auto">
                
                {/* Editorial Breadcrumbs */}
                <div className="flex items-center gap-3 text-[10px] font-bold tracking-[0.3em] uppercase text-[#494040]/40 mb-10">
                    <span>Atelier</span>
                    <ChevronRight size={10} className="text-[#f1d1d1]" />
                    <span>Admin</span>
                    <ChevronRight size={10} className="text-[#f1d1d1]" />
                    <span className="text-[#494040]">Client Directory</span>
                </div>

                {/* Header Section */}
                <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-[#f1d1d1]/30 pb-12 mb-12">
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 text-[#f1d1d1]">
                            <span className="w-12 h-[1px] bg-[#f1d1d1]"></span>
                            <span className="text-[10px] font-bold tracking-[0.4em] uppercase">User Governance</span>
                        </div>
                        <h1 className="text-5xl font-serif italic tracking-tight">
                            Client <span className="font-sans not-italic font-light">Directory</span>
                        </h1>
                        <p className="text-[11px] text-[#494040]/40 uppercase tracking-[0.1em] font-medium max-w-lg">
                            Managing the digital identities and access protocols of the BagBelle community.
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => navigate("/admin/user/create")}
                            className="group flex items-center gap-4 bg-[#494040] text-[#fffcfc] px-8 py-4 rounded-full transition-all duration-500 hover:bg-[#362f2f] shadow-xl"
                        >
                            <Plus size={16} className="text-[#f1d1d1] transition-transform group-hover:rotate-90" />
                            <span className="text-[10px] font-bold tracking-[0.3em] uppercase">Enroll New Client</span>
                        </button>
                    </div>
                </header>

                {/* Stats Grid - Boutique Style */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {[
                        { label: "Registered Members", value: users.length },
                        { label: "Active Sessions", value: users.filter((u) => u.status === "active").length },
                        { label: "Pending Verification", value: users.filter((u) => u.status === "pending").length },
                        { label: "Atelier Curators", value: users.filter((u) => u.role === "admin").length },
                    ].map((stat, index) => (
                        <div key={index} className="p-6 border border-[#f1d1d1]/40 bg-white shadow-[0_10px_30px_rgba(73,64,64,0.02)]">
                            <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-[#494040]/40 mb-2">{stat.label}</p>
                            <p className="text-3xl font-serif italic text-[#494040]">{stat.value}</p>
                        </div>
                    ))}
                </div>

                {/* Search & Filter Bar */}
                <div className="relative mb-8 max-w-md group">
                    <SearchIcon className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-4 text-[#f1d1d1] group-focus-within:text-[#494040] transition-colors" strokeWidth={1.5} />
                    <input
                        type="text"
                        placeholder="Search by name, email or role..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-8 pr-4 py-2 bg-transparent border-b border-[#f1d1d1]/50 text-[#494040] placeholder-[#494040]/30 focus:outline-none focus:border-[#494040] transition-all text-sm font-light"
                    />
                </div>

                {/* Table Area */}
                <div className="bg-white border border-[#f1d1d1]/30 shadow-[0_10px_40px_rgba(73,64,64,0.02)] overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-[#f1d1d1]/30 bg-[#f1d1d1]/5">
                                <th className="px-6 py-4 text-[10px] font-bold tracking-[0.2em] uppercase text-[#494040]/60">Client Details</th>
                                <th className="px-6 py-4 text-[10px] font-bold tracking-[0.2em] uppercase text-[#494040]/60">Privilege</th>
                                <th className="px-6 py-4 text-[10px] font-bold tracking-[0.2em] uppercase text-[#494040]/60">Status</th>
                                <th className="px-6 py-4 text-[10px] font-bold tracking-[0.2em] uppercase text-[#494040]/60">Logged Since</th>
                                <th className="px-6 py-4 text-[10px] font-bold tracking-[0.2em] uppercase text-[#494040]/60 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#f1d1d1]/10">
                            {filteredUsers.map((user) => (
                                <tr key={user._id} className="hover:bg-[#f1d1d1]/5 transition-colors group">
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 border border-[#f1d1d1] flex items-center justify-center bg-[#fffcfc] text-[10px] font-bold">
                                                {user.username.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold uppercase tracking-wider text-[#494040]">{user.username}</p>
                                                <p className="text-[10px] text-[#494040]/40 italic font-serif lowercase">{user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className={`text-[9px] font-bold tracking-widest uppercase px-3 py-1 border ${
                                            user.role === 'admin' ? 'border-[#494040] bg-[#494040] text-[#fffcfc]' : 'border-[#f1d1d1] text-[#494040]/60'
                                        }`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-1.5 h-1.5 rounded-full ${user.status === 'active' ? 'bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.5)]' : 'bg-[#f1d1d1]'}`}></div>
                                            <span className="text-[10px] font-bold tracking-tighter uppercase text-[#494040]/60">{user.status}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 text-[11px] font-light text-[#494040]/60">
                                        {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        <div className="flex justify-end items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => navigate(`/admin/user/${user._id}`)} className="p-2 text-[#494040]/40 hover:text-[#494040] transition-colors"><Eye size={16} strokeWidth={1.5} /></button>
                                            <button onClick={() => navigate(`/admin/user/${user._id}/edit`)} className="p-2 text-[#494040]/40 hover:text-[#494040] transition-colors"><Edit size={16} strokeWidth={1.5} /></button>
                                            <button onClick={() => openDeleteModal(user._id)} className="p-2 text-[#494040]/40 hover:text-red-400 transition-colors"><Trash2 size={16} strokeWidth={1.5} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {filteredUsers.length === 0 && (
                        <div className="py-20 text-center">
                            <p className="font-serif italic text-[#494040]/40">No records found matching your query.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Protocol Delete Modal */}
            <DeleteModal
                isOpen={!!deleteId}
                onClose={closeDeleteModal}
                onConfirm={handleConfirmDelete}
                title="De-enrollment Protocol"
                description="Are you sure you wish to permanently remove this client from the BagBelle Registry? This action cannot be revoked."
            />
        </div>
    )
}