import { useState } from "react"
import { useEditUserMutation } from "../features/users/users.api"
import { InputUser } from "../features/users/types"
import { Button, Input, Modal } from "@mui/material"
import styles from '../features/users/users.module.css'

type Props = {
    user: {
        id: string
        name: string
        salary: number
    }

    onClose: () => void
}

export const EditUser = ({ user, onClose }: Props) => {
    const [editUser] = useEditUserMutation()
    const [data, setData] = useState<InputUser>({
        name: user.name,
        salary: user.salary
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setData({
            ...data,
            [name]: value
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        editUser({ id: user.id, updatedUser: data })
        onClose()
    }

    return (
        <>
            <Modal open={true} onClose={onClose} className={styles.modal}>
                <form onSubmit={handleSubmit}>
                    <h3>EditUser</h3>
                    <Input
                        type="text"
                        name="name"
                        value={data.name}
                        onChange={handleChange}
                    />
                    <br />
                    <Input
                        type="number"
                        name="salary"
                        value={data.salary}
                        onChange={handleChange}
                    />
                    <br />
                    <Button type="submit">Save</Button>

                </form>
            </Modal>

        </>
    )
}
