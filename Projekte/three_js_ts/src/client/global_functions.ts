//TODO: nicht bnutzte Funktionen wieder entfernen

export const visibleHeightAtZDepth = ( depth:number, camera:any ) => {
    // compensate for cameras not positioned at z=0
    const cameraOffset = camera.position.z;
    if ( depth < cameraOffset ) depth -= cameraOffset;
    else depth += cameraOffset;
  
    // vertical fov in radians
    const vFOV = camera.fov * Math.PI / 180; 
  
    // Math.abs to ensure the result is always positive
    return 2 * Math.tan( vFOV / 2 ) * Math.abs( depth );
};
  
export const visibleWidthAtZDepth = ( depth:number, camera:any ) => {
    const height = visibleHeightAtZDepth( depth, camera );
    return height * camera.aspect;
};

export const getPeaks=(data:[],threshold:number)=>{
    var peaksArray = [];
    for(var i = 0; i < data.length;) {
      if (data[i] > threshold) {
        peaksArray.push(i);
        // Skip forward ~ 1/4s to get past this peak.
        i += 10000;
      }
      i++;
    }
    return peaksArray;
};

interface randProps{
  (max?:number,min?:number):number
}
export var randnum:randProps =(max=-1,min=1):number =>{
    return (Math.random() * (max - min) + min);
}

export enum Enum_Visual_Method{
    Muster1 = 0,
    Muster2,
    Muster3,
    Muster4,
    Muster5,
    Muster6,
    Muster7,
    Muster8,
    Muster9,
    Muster10,
    Muster11,
    Muster12,
    Muster13,
    Muster14,
    Muster15
}