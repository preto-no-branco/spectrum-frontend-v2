const GradientIcon = ({ colorGradient }: { colorGradient: string }) => {
  return <div className={`w-5 h-5 rounded-sm`} style={{ background: colorGradient }} />
}

export default GradientIcon
