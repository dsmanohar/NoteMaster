import { Component, OnInit } from '@angular/core'
import { error } from 'console'
import { from } from 'rxjs'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnInit {
  title = 'NoteMastery'
  globalMidi: WebMidi.MIDIAccess | null = null

  ngOnInit(): void {
    from(navigator.requestMIDIAccess()).subscribe(
      (data) => {
        this.onMIDISuccess(data)
      },
      (error) => {
        alert('You dont have midi access')
      },
    )
  }

  onMIDISuccess(midiAccess: WebMidi.MIDIAccess) {
    if (midiAccess?.inputs.size > 0) {
      this.globalMidi = midiAccess
    } else {
      this.onMIDIFailure()
    }
  }

  onMIDIFailure() {
    alert('You dont have midi access')
  }
}
