import { PixelatedCanvas } from '../ui/pixelated-canvas'

export default function Testpage() {
    return (
        <>
            <div className='sm:grid grid-cols-2 gap-3 min-h-screen'>
                <div>

                </div>
                <div className='flex justify-end items-end'>
                    <PixelatedCanvas
                        src="/img/portfolio/bg1.png"
                        width={1000}
                        height={900}
                        cellSize={5}
                        dotScale={0.4}
                        shape="circle"
                        backgroundColor="#000"
                        dropoutStrength={0.1}
                        interactive
                        distortionStrength={9}
                        distortionRadius={350}
                        distortionMode="repel"
                        followSpeed={0.1}
                        jitterStrength={100}
                        jitterSpeed={0.3}
                        sampleAverage
                        tintColor=""
                        tintStrength={0.2}
                    />
                </div>
            </div>
        </>
    )
}
