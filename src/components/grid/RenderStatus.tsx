import { CustomBadge } from "../ui/CustomBadge"

const RenderStatus = (status: string) => {
  return (
    <CustomBadge status={status}/>
  )
}

export default RenderStatus