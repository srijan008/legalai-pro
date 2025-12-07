type Props = {
  code: string
}

export default function SmartContractCodeView({ code }: Props) {
  return (
    <pre className="bg-black text-green-300 text-xs p-4 rounded-xl overflow-x-auto">
      {code}
    </pre>
  )
}
