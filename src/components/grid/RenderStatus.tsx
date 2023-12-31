import { CustomBadge } from "../ui/CustomBadge"

const RenderStatus = (data: any) => {
  return (
    <CustomBadge status={data.status}/>
  )
}

export default RenderStatus