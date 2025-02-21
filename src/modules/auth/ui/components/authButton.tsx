import { UserCircleIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

const AuthButton = () => {
    // Add different Auth states
  return (
    <Button 
    variant="outline"
    className="px-4 py-2.5 text-sm font-medium text-blue-600 hover:text-blue-500 rounded-full border-blue-500/20 shadow-none [&_svg]:size-5"
    >
        <UserCircleIcon size={24}/>
        Sign In
    </Button>
  )
}

export default AuthButton