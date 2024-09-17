import { useState } from "react"
import { AddUser } from "../../utils/add-user"
import { useDeleteUserMutation, useGetUsersQuery } from "./users.api"
import { Button, } from "@mui/material"
import style from './users.module.css'
import { EditUser } from "../../utils/edit-user"
import { IUser } from "./types"

export const Users = () => {
    const { data, isLoading, error } = useGetUsersQuery(null)
    const [deleteUser] = useDeleteUserMutation()
    const [editing, setEditing] = useState<IUser | null>(null)

    const onDelete = (id: string) => {
        deleteUser(id)
    }


    return (
        <>
            <h1>Users</h1>
            <AddUser />
            {isLoading && <p>LOADING..</p>}
            {data && (
                <>
                    <table className={style.table}>
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>name</th>
                                <th>salary</th>
                                <th>actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(user => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.salary} AMD</td>
                                    <td>
                                        <Button variant="outlined" color="error" onClick={() => onDelete(user.id)}>
                                            delete
                                        </Button>
                                        <Button variant="outlined" onClick={() => setEditing(user)}>Edit</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}

            {editing && (
                <EditUser
                    user={editing}
                    onClose={() => setEditing(null)}
                />
            )}
        </>
    )
}
