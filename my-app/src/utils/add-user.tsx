import { useState } from "react"
import { InputUser } from "../features/users/types"
import { useAddUserMutation } from "../features/users/users.api"
import { Button, Input } from "@mui/material"

export const AddUser = () => {
    const [user, setUser] = useState<InputUser>({
        name: "",
        salary: 90000
    })
    const [addUser, result] = useAddUserMutation()
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        addUser(user)
            .then(() => {
                setUser({ name: "", salary: 900000 })
            })

    }
    return <>
        <h3>Add User</h3>
        <form onSubmit={handleSubmit}>
            <Input
                type="text"
                placeholder="enter the name"
                value={user.name}
                onChange={e => setUser({ ...user, name: e.target.value })}
            />
            <br />

            <Input
                type="number"
                placeholder="enter the salary"
                value={user.salary}
                onChange={e => setUser({ ...user, salary: +e.target.value })} />
            <br />
            <Button type="submit">save</Button>
        </form>
    </>

}