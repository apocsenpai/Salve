export default function Error({ message }: { message: string }) {
  return <p className="text-xs italic text-red-800 font-bold">{message}</p>
}
