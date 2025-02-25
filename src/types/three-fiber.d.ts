declare module '@react-three/fiber';
declare module '@react-three/drei';

// Расширяем JSX.IntrinsicElements для компонентов Three.js
declare namespace JSX {
  interface IntrinsicElements {
    group: any;
    mesh: any;
    cylinderGeometry: any;
    boxGeometry: any;
    sphereGeometry: any;
    meshStandardMaterial: any;
    ambientLight: any;
    pointLight: any;
  }
} 