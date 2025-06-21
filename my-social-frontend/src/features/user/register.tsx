import { useForm } from "react-hook-form"
import { useState } from "react"
import { Button, Link } from "@heroui/react"
import { useRegisterMutation } from "../../app/services/userApi"
import { hasErrorField } from "../../utils/has-error-field"
import { Input } from "../../components/input/input"
import { ErrorMessage } from "../../components/error-message/error-message"

type Register = {
  email: string
  name: string
  password: string
}

type Props = {
  setSelected: (value: string) => void
}

export const Register = ({ setSelected }: Props) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Register>({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  })

  const [register] = useRegisterMutation()
  const [error, setError] = useState("")

  const onSubmit = async (data: Register) => {
    try {
      await register(data).unwrap()
      setSelected("login")
    } catch (err) {
      if (hasErrorField(err)) {
        setError(err.data.error)
      }
    }
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <Input control={control} required="Required" label="Name" name="name" />
      <Input
        control={control}
        name="email"
        label="Email"
        type="email"
        required="Required"
      />
      <Input
        control={control}
        name="password"
        label="Password"
        type="password"
        required="Required"
      />
      <ErrorMessage error={error} />

      <p className="text-center text-small">
        Already have account?{" "}
        <Link
          size="sm"
          className="cursor-pointer"
          onPress={() => setSelected("login")}
        >
          Sign in
        </Link>
      </p>
      <div className="flex gap-2 justify-end">
        <Button fullWidth color="primary" type="submit">
          Sign up
        </Button>
      </div>
    </form>
  )
}
