import * as THREE from 'three'
import { Scenaries } from './Scenaries'
import { Enum_Visual_Method } from './Global_Collection'

/** # Audio Control
 *  - start 
 *  - stop
 *  - pause
 *  - sound laden
 *  - Visualisierung steuern (nach stand der Musik) 
 *  - Audio FFT-Analyse
 */
export class Audio_Processing{

    //Audio
    Music:THREE.Audio
    Music_Loader:THREE.AudioLoader
    Analyzer:THREE.AudioAnalyser
    Analyser_Data:any
    FFT_Size:number
    //Szenario
    Szenarios:Scenaries<THREE.Object3D>[]
    Enum_Leangth:number

    constructor(listener:THREE.AudioListener, szenario:Scenaries<THREE.Object3D>[],fft_size:number){
        //Audio
        this.FFT_Size=fft_size
        this.Music_Loader=new THREE.AudioLoader
        this.Music=new THREE.Audio(listener)                
        this.Analyzer = new THREE.AudioAnalyser(this.Music) //Analyser AIPI
        this.Analyser_Data = []     //Daten beinhalten FFT-Analyse

        //Objekte / Szenario
        this.Szenarios=szenario
        this.Enum_Leangth=Object.keys(Enum_Visual_Method).length
    }
     
    Load_Music(path:string,name?:string){
        this.Reset_Music()
        //Audio Laden
        this.Music_Loader.load( path, ( buffer )=> {
            setTimeout(()=>{
                this.Music.setBuffer( buffer );
                this.Music.setLoop(true);
                this.Music.setVolume(1);
                this.Analyzer=new THREE.AudioAnalyser(this.Music,this.FFT_Size)
                this.Music.play()
            },0);

        });
        if(name == null){
            name=path
        }
        //Pfad/Name der Datei anzeigen
        const lb_path = document.getElementById("lb_perf") as HTMLParagraphElement
        lb_path.textContent=name
    }
    
    Play_Music(){
        this.Music.play()
    }

    Pause_Music(){
        this.Music.pause()
    }
    
    Reset_Music(){
        this.Music.stop()

        for(let i=0;i<this.Szenarios.length;i++){
            this.Szenarios[i].Animate_Reset()
        }
    }

    Toggle_Music(){
        if(this.Music.isPlaying){
            this.Music.pause()
        }
        else{
            this.Music.play()
        }
    }

    /** # Visualisierung steuern
     *  - idle (wenn keine Musik spielt)
     *  - Visualisierung (wenn Musik spielt)
     */
    Visualize(){

        //TODO: ist Audio schon geladen??
        if(this.Music.isPlaying){

            //FFT-Analyse 
            var data = this.Analyzer.getFrequencyData()
            var freq = this.Analyzer.getAverageFrequency()
            //Darstellung der analysierten Daten
            for(let i=0;i<this.Szenarios.length;i++){
                this.Szenarios[i].Animate_Visualisation(data,freq)
            }
        }
        else
        {
            //leerlauf-Animation
            for(let i=0;i<this.Szenarios.length;i++){
                this.Szenarios[i].Animate_Idle()
            }
        }
    }
}

