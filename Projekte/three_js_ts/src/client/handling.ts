import { Audio_Processing } from './processing';

/** # Event-Handling
 *  - Button-event-handlers
 *  - Verweise auf eigene Audio-Control Klasse für start,stop,...
 *  - Dateien Pfade ermitteln
 */
export class Event_Handler{
    Visualizer:Audio_Processing
    constructor(visualizer:Audio_Processing)
    {

        this.Visualizer=visualizer

        //play button handler initialisieren
        let bt_play= document.getElementById("bt_play")
        bt_play?.addEventListener("click",(e:Event)=>this.event_bt_play());
        //pause button handler initialisieren
        let bt_pause= document.getElementById("bt_pause")
        bt_pause?.addEventListener("click",(e:Event)=>this.event_bt_pause());
        //stop button handler initialisieren
        let bt_stop= document.getElementById("bt_stop")
        bt_stop?.addEventListener("click",(e:Event)=>this.event_bt_stop());
        //file button handler initialisieren
        let bt_file= document.getElementById("bt_file")
        bt_file?.addEventListener("click",(e:Event)=>this.event_bt_file());
        //file-input button handler initialisieren
        let bt_upload= document.getElementById("file_input")
        bt_upload?.addEventListener("change",(e:Event)=>this.event_bt_upload(),false);
    }

/** Button Handler funktionen
 *  - event_bt_play
 *  - event_bt_pause
 *  - event_bt_stop
 *  - event_bt_file
 *  - event_bt_upload
 * */

    event_bt_play=()=>{
        //musik und visualisierung starten
        console.log("Event Start_Button")
        this.Visualizer.Play_Music()
    }

    event_bt_pause=()=>{
        //musik anhalten, visualisierung zurücksetzten
        console.log("Event Pause_Button")
        this.Visualizer.Pause_Music()
    }

    event_bt_stop=()=>{
        //reset, musik stopp und animation beenden
        console.log("Event Stop_Button")
        this.Visualizer.Reset_Music()
    }

    event_bt_file=()=>{
        this.Visualizer.Reset_Music()
        console.log("Event File_Button")
        this.Visualizer.Load_Music("./media/audio/audio.mp3","Bella_Ciao")
    }

    event_bt_upload=()=>{
        this.Visualizer.Reset_Music()
        //MP3-Datei hochladen / Pfad ermitteln
        let fileInput = document.getElementById("file_input") as HTMLInputElement;
        var mp3_file = "404_File_Not_Found"
        var name = null
        if(fileInput != null){
            if(fileInput.files !=null){
                var item = fileInput.files.item(0)
                console.log(item)
                if(item!= null){
                    mp3_file = URL.createObjectURL(item)
                    name=item.name
                }
            }
        }
        console.log(mp3_file)
        this.Visualizer.Load_Music(mp3_file)
    }
}