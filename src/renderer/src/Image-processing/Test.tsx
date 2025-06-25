import React from 'react'
import { runTests } from './pipeline/pipeline.test'

const InvertImage: React.FC = () => {

  runTests()

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
      teste
    </div>
  )
}

export default InvertImage
