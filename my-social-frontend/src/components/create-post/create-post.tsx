import { Controller, useForm } from "react-hook-form"
import {
  useCreatePostMutation,
  useLazyGetAllPostsQuery,
} from "../../app/services/postsApi"
import { Button, Textarea } from "@heroui/react"
import { ErrorMessage } from "../error-message/error-message"
import { IoMdCreate } from "react-icons/io"

export const CreatePost = () => {
  const [createPost] = useCreatePostMutation()
  const [triggerGetAllPosts] = useLazyGetAllPostsQuery()

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm()

  const error = errors?.post?.message as string

  const onSubmit = handleSubmit(async data => {
    console.log("Submitting with data:", data)
    try {
      const result = await createPost({ content: data.post }).unwrap()
      console.log("Post created:", result)
      setValue("post", "")
      await triggerGetAllPosts().unwrap()
    } catch (error) {
      console.error("Error while creating post:", error)
    }
  })

  return (
    <form onSubmit={onSubmit} className="flex-grow">
      <Controller
        name="post"
        control={control}
        defaultValue=""
        rules={{
          required: "Required",
        }}
        render={({ field }) => (
          <Textarea
            {...field}
            labelPlacement="outside"
            placeholder="..."
            className="mb-5"
          ></Textarea>
        )}
      ></Controller>

      {errors && <ErrorMessage error={error} />}

      <Button
        color="success"
        className="flex-end"
        endContent={<IoMdCreate />}
        type="submit"
      >
        Add post
      </Button>
    </form>
  )
}
