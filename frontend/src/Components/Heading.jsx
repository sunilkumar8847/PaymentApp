export default function Heading({label, lebel}) {
  // Support both label and lebel for backward compatibility
  const text = label || lebel;
  
  return (
    <div className="font-bold text-4xl pt-8 pb-4 text-gray-800">{text}</div>
  )
}
