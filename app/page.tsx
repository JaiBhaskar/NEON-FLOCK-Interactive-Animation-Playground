import { SmokeScreen } from "./components/smokescreen";
import { Globe3D } from "@/components/ui/3d-globe";
import BirdsBackground from "@/components/ui/BirdsBackground";
const markers = [
  {
    lat: 28.6139,
    lng: 77.209,
    src: "/Rohan.jpg",
    label: "Delhi",
  },
  {
    lat: 40.7128,
    lng: -74.006,
    src: "/jai.jpg",
    label: "New York",
  },
];

export default function Home() {
  return (
      <main className="relative h-screen w-screen overflow-hidden ">
        {/* <SmokeScreen /> */}
        <BirdsBackground />
        <div className="relative z-10">
        {/* <Globe3D markers={markers} className="mt-5" /> */}
        </div>

      </main>
  );
}
