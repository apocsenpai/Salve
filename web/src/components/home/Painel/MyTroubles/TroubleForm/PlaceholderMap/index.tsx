export default function PlaceholderMap({ onClick }: { onClick: () => void }) {
  return (
    <div className="flex h-80 w-full items-center justify-center rounded-lg border border-dashed border-emphasis">
      <h3
        onClick={onClick}
        className="cursor-pointer text-2xl font-normal text-alternative hover:text-emphasis hover:underline"
      >
        Clique para obter a localização atual
      </h3>
    </div>
  )
}
