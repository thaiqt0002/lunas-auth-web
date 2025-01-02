interface IProps {
  children: React.ReactNode
}
const AuthFormCard: React.FC<IProps> = ({ children }) => {
  return (
    <div className="flex w-104 flex-col items-center gap-y-4 rounded-2xl bg-[rgba(250,230,255,0.15)] p-10 backdrop-blur-3xl">
      {children}
    </div>
  )
}

export default AuthFormCard
