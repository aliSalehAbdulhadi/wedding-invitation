// Original, finite bell tones. Called only from the envelope's activation gesture.
export function playOpeningChime(context) {
  const bus=context.createGain();
  bus.gain.value=.055;
  bus.connect(context.destination);
  let voices=8;
  for (const [index,midi] of [79,84,88,91].entries()) {
    for (const harmonic of [1,2.002]) {
      const voice=context.createOscillator(), envelope=context.createGain();
      const at=context.currentTime+.025+index*.145;
      const end=at+1.15+index*.07;
      voice.type='sine';
      voice.frequency.value=440*2**((midi-69)/12)*harmonic;
      envelope.gain.setValueAtTime(.0001,at);
      envelope.gain.linearRampToValueAtTime(harmonic===1?.3:.045,at+.014);
      envelope.gain.exponentialRampToValueAtTime(.0001,end);
      voice.connect(envelope); envelope.connect(bus);
      voice.start(at); voice.stop(end+.03);
      voice.onended=()=>{ voice.disconnect(); envelope.disconnect(); if (--voices===0) bus.disconnect(); };
    }
  }
}
