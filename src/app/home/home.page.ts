import { Component } from '@angular/core';

const DAY_NIGHT_INTERVAL = 300;
const ROSH_INTERVAL = 300;
const WISDOM_RUNE_INTERVAL = 420;
const BOUNTY_RUNE_INTERVAL = 180;
const LOTUS_INTERVAL = 180;
const POWER_RUNE_INTERVAL = 120;
const TORMENTOR_INTERVAL = 1200;

const WARNING_BUFFER = 30;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  gameStarted: boolean = false;
  seconds: number = 0;
  formattedTime: string = '00:00';
  timerIntervalReference: any;

  warnings: string[] = [];

  dayNight: string = 'day';
  rosh: string = 'south';

  utterances: any = {
    'powerrunes': `Power runes will spawn in ${WARNING_BUFFER} seconds`,
    'rosh': `Rosh will change locations in ${WARNING_BUFFER} seconds`,
    'daynight': `Day/night will change in ${WARNING_BUFFER} seconds`,
    'wisdomrunes': `Wisdom runes will spawn in ${WARNING_BUFFER} seconds`,
    'bountyrunes': `Bounty runes will spawn in ${WARNING_BUFFER} seconds`,
    'lotus': `Lotus flowers will spawn in ${WARNING_BUFFER} seconds`
  }

  warningStrings: any = {
    'powerrunes': 'Power Runes',
    'bountyrunes': 'Bounty Runes',
    'daynight': 'Day/Night Cycle',
    'rosh': 'Roshan Changing Location',
    'wisdomrunes': 'Wisdom Runes',
    'lotus': 'Lotus Blossom spawns'
  }

  constructor() {
  }

  speak(text: string) {
    var msg = new SpeechSynthesisUtterance(text);
    msg.voice = window.speechSynthesis.getVoices()[0];
    window.speechSynthesis.speak(msg);
  }

  startGame() {
    this.gameStarted = true;
    this.speak('Game has started');
    this.timerIntervalReference = setInterval( () => { this.tick() }, 1000);
  }

  stopGame() {
    this.gameStarted = false;
    this.seconds = 0;
    this.formattedTime = "00:00";
    clearInterval(this.timerIntervalReference);
  }

  tick() {
    console.log('Ticking every second');
    this.seconds = this.seconds + 1;
    this.formattedTime = new Date(this.seconds * 1000).toISOString().slice(14, 19);
    const seconds = this.seconds;

    this.checkDayNight(seconds);
    this.checkRosh(seconds);
    this.checkForWisdomRunes(seconds);
    this.checkPowerRunes(seconds);
    this.checkBountyRunes(seconds);
  }

  pushToWarnings(warning: string) {
    // this will ensure we're not stacking warnings
    if (!this.warnings.includes(warning)) {
      this.warnings = [...this.warnings, warning];
      this.speak(this.utterances[warning]);
    }
  }

  checkDayNight(seconds:number) {
    if (seconds % DAY_NIGHT_INTERVAL === 0) {
      this.dayNight = this.dayNight === 'day' ? 'night' : 'day';
      this.warnings.splice(this.warnings.indexOf('daynight'));
      this.speak(`It is now ${this.dayNight} time`);
    } else if (seconds % DAY_NIGHT_INTERVAL > (DAY_NIGHT_INTERVAL - WARNING_BUFFER)) {
      this.pushToWarnings('daynight');
    }
  }

  checkRosh(seconds: number) {
    if (seconds % ROSH_INTERVAL === 0) {
      this.rosh = this.rosh === 'south' ? 'north' : 'south';
      this.warnings.splice(this.warnings.indexOf('rosh'));
      this.speak(`Rosh has moved to the ${this.rosh} pit`);
    } else if (seconds % ROSH_INTERVAL > (ROSH_INTERVAL - WARNING_BUFFER)) {
      this.pushToWarnings('rosh');
    }
  }

  checkForWisdomRunes(seconds: number) {
    if (seconds % WISDOM_RUNE_INTERVAL === 0) {
      this.speak(`Wisdom runes have spawned`);
      this.warnings.splice(this.warnings.indexOf('wisdomrunes'));
    } else if (seconds % WISDOM_RUNE_INTERVAL > (WISDOM_RUNE_INTERVAL - WARNING_BUFFER)) {
      this.pushToWarnings('wisdomrunes');
    }
  }

  checkPowerRunes(seconds:number) {
    if (seconds % POWER_RUNE_INTERVAL === 0) {
      this.speak('Power runes have spawned');
      this.warnings.splice(this.warnings.indexOf('powerrunes'));
    } else if (seconds % POWER_RUNE_INTERVAL > (POWER_RUNE_INTERVAL - WARNING_BUFFER)) {
      this.pushToWarnings('powerrunes');
    }
  }

  checkBountyRunes(seconds: number) {
    if (seconds % BOUNTY_RUNE_INTERVAL === 0) {
      this.speak(`Bounty runes have spawned`);
      this.warnings.splice(this.warnings.indexOf('bountyrunes'));
    } else if (seconds % BOUNTY_RUNE_INTERVAL > (BOUNTY_RUNE_INTERVAL - WARNING_BUFFER)) {
      this.pushToWarnings('bountyrunes');
    }
  }

  checkLotusRunes(seconds: number) {
    if (seconds % LOTUS_INTERVAL === 0) {
      this.speak(`Lotus flowers have spawned`);
      this.warnings.splice(this.warnings.indexOf('lotus'));
    } else if (seconds % LOTUS_INTERVAL > (LOTUS_INTERVAL - WARNING_BUFFER)) {
      this.pushToWarnings('lotus');
    }
  }

  ///////////////////////////////////////////////////
  // TODO remove this after debugging
  fastForward(seconds:number) {
    this.seconds = this.seconds + seconds;
  }

}
