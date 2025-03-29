//rfcp, rfc
export default function Subheading({label, lebel}) {
  // Support both label and lebel for backward compatibility
  const text = label || lebel;
  
  return (
    <div className="text-gray-600 pt-1 pb-4 py-4 text-sm">{text}</div>
  )
}
