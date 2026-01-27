import { Sparkles } from 'lucide-react'
import React from 'react'

const Ribbion = () => {
    return (
        <div className="relative bg-linear-to-r from-amber-400 via-yellow-500 to-amber-600 text-black py-3 px-4">
            <div className="max-w-7xl mx-auto text-center text-sm flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span className="font-semibold">Special Offer:</span>
                <span className="font-medium">Get 20% off on all services this month!</span>
                <Sparkles className="w-4 h-4" />
            </div>
        </div>
    )
}

export default Ribbion