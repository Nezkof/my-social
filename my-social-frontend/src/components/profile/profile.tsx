import { useSelector } from "react-redux"
import { selectCurrent } from "../../features/user/userSlices"
import { Card, CardBody, CardHeader } from "@heroui/card"
import { Image } from "@heroui/react"
import { BASE_URL } from "../../constants"
import { Link } from "react-router-dom"
import { MdAlternateEmail } from "react-icons/md"

export const Profile = () => {
  const current = useSelector(selectCurrent)

  if (!current) {
    return null
  }

  const { name, email, avatarUrl, id } = current

  return (
    <Card className="py-4 w-[302px]">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
        <Image
          alt="Card profile"
          className="object-cover rounded-xl"
          src={`${BASE_URL}${avatarUrl}`}
          width={370}
        ></Image>
      </CardHeader>

      <CardBody>
        <Link to={`/users/${id}`}>
          <h4 className="font-bold text-large-mb-2">{name}</h4>
          <p className="text-default-500 flex items-center gap-2">
            <MdAlternateEmail></MdAlternateEmail>
            {email}
          </p>
        </Link>
      </CardBody>
    </Card>
  )
}
