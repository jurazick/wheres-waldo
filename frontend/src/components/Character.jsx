import { useEffect, useRef } from "react"

export default function Character({ imageUrl, x, y }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const img = new Image()
    img.src = imageUrl

    img.onload = () => {
      const canvas = canvasRef.current
      const ctx = canvas.getContext("2d")

      const avatarSize = 64
      const cropSize = 120

      // convert 0-100 values to pixels
      const px = (x / 100) * img.width
      const py = (y / 100) * img.height

      const sx = px - cropSize / 2
      const sy = py - cropSize / 2

      ctx.clearRect(0, 0, avatarSize, avatarSize)

      ctx.drawImage(
        img,
        sx,
        sy,
        cropSize,
        cropSize,
        0,
        0,
        avatarSize,
        avatarSize
      )
    }
  }, [imageUrl, x, y])

  return (
    <canvas
      ref={canvasRef}
      width={64}
      height={64}
      className="h-16 w-16 rounded-full border border-gray-300"
    />
  )
}