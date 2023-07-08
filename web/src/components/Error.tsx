export default function Error({ message }: { message: string }) {
	return <p className="text-xs font-bold italic text-red-800">{message}</p>
}
