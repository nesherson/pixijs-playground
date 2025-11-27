import { CoordinatePlaneCanvas } from "../../../features/coordinatePlane/CoordinatePlaneCanvas";

export default function CoordinatePlane() {
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-indigo-600 mb-4">Coordinate plane</h1>
            <CoordinatePlaneCanvas />
        </div>
    );
}