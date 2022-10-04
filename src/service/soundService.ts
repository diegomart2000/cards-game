import { Howl } from 'howler';
import delay from 'lodash/delay';

interface ISoundMap {
  backgroundMusic: Howl | null;
  backgroundAmbient: Howl | null;

  winMusic: Howl | null;
  winAmbient: Howl | null;
  winAlert: Howl | null;

  loseMusic: Howl | null;
  loseAmbient: Howl | null;
  loseAlert: Howl | null;

  cardShuffle: Howl | null;
  cardDeal: Howl | null;
  cardRequest: Howl | null;
}

interface Runnable {
  run: () => Promise<void>;
}

class Chain implements Runnable {
  queue: Runnable[] = [];

  constructor(private service: SoundService, prev?: Runnable[]) {
    this.queue = prev || this.queue;
  }

  sleep(time: number) {
    const runable: Runnable = {
      run: () => new Promise<void>((resolve) => delay(resolve, time, 'sleep')),
    };

    this.queue.push(runable);
    return new Chain(this.service, this.queue);
  }

  play(key: keyof ISoundMap | (keyof ISoundMap)[]) {
    let runable: Runnable;

    if (Array.isArray(key)) {
      const sounds = key.map((key$) => this.service.soundMap[key$]);

      runable = {
        run: () =>
          new Promise<void>((resolve) => {
            const duration = sounds.reduce((max, sound) => {
              sound?.play();
              const localDuration = (sound?.duration() || 0) * 1000;
              if (localDuration > max) {
                return localDuration;
              }
              return max;
            }, 0);

            setTimeout(resolve, duration);
          }),
      };
    } else {
      const sound = this.service.soundMap[key];

      runable = {
        run: () =>
          new Promise<void>((resolve) => {
            sound?.play();
            setTimeout(resolve, (sound?.duration() || 0) * 1000);
          }),
      };
    }

    this.queue.push(runable);
    return new Chain(this.service, this.queue);
  }

  fadeOut(key: keyof ISoundMap) {
    const runable: Runnable = {
      run: async () => {
        this.service.fadeOut(key);
      },
    };

    this.queue.push(runable);
    return new Chain(this.service, this.queue);
  }

  stop(key: keyof ISoundMap) {
    const sound = this.service.soundMap[key];
    const runable: Runnable = {
      run: async () => {
        sound?.stop();
      },
    };

    this.queue.push(runable);
    return new Chain(this.service, this.queue);
  }

  run = async () => {
    // eslint-disable-next-line no-restricted-syntax
    return this.queue.reduce((current, next) => current.then(() => next.run()), Promise.resolve());
  };
}

class SoundService {
  soundMap: ISoundMap = {
    backgroundMusic: null,
    backgroundAmbient: null,

    winMusic: null,
    winAmbient: null,
    winAlert: null,

    loseMusic: null,
    loseAmbient: null,
    loseAlert: null,

    cardShuffle: null,
    cardDeal: null,
    cardRequest: null,
  };

  init() {
    this.soundMap.backgroundMusic = new Howl({
      src: '/sounds/background-music.mp3',
      preload: true,
      volume: 0.5,
      onload: () => this.onLoaded('backgroundMusic'),
    });

    this.soundMap.backgroundAmbient = new Howl({
      src: '/sounds/background-ambient.mp3',
      preload: true,
      autoplay: true,
      volume: 0.3,
      loop: true,
      onload: () => this.onLoaded('backgroundAmbient'),
    });

    this.soundMap.cardShuffle = new Howl({
      src: '/sounds/card-shuffle.mp3',
      preload: true,
      volume: 0.9,
      onload: () => this.onLoaded('cardShuffle'),
    });

    this.soundMap.cardRequest = new Howl({
      src: '/sounds/card-request.mp3',
      preload: true,
      volume: 1,
      onload: () => this.onLoaded('cardRequest'),
    });

    this.soundMap.cardDeal = new Howl({
      src: '/sounds/card-deal.mp3',
      preload: true,
      volume: 0.7,
      onload: () => this.onLoaded('cardDeal'),
    });

    this.soundMap.winAlert = new Howl({
      src: '/sounds/win-alert.mp3',
      preload: true,
      volume: 0.8,
      onload: () => this.onLoaded('winAlert'),
    });

    this.soundMap.winMusic = new Howl({
      src: '/sounds/win-music.mp3',
      preload: true,
      volume: 0.8,
      onload: () => this.onLoaded('winMusic'),
    });

    this.soundMap.winAmbient = new Howl({
      src: '/sounds/win-ambient.mp3',
      preload: true,
      volume: 0.8,
      onload: () => this.onLoaded('winAmbient'),
    });

    this.soundMap.loseMusic = new Howl({
      src: '/sounds/lose-music.mp3',
      preload: true,
      volume: 0.8,
      onload: () => this.onLoaded('loseMusic'),
    });

    this.soundMap.loseAmbient = new Howl({
      src: '/sounds/lose-ambient.mp3',
      preload: true,
      volume: 0.8,
      onload: () => this.onLoaded('loseAmbient'),
    });
  }

  onLoaded = (key: keyof ISoundMap) => key; // useStore.getState().sound.loaded(key);

  play = (key: keyof ISoundMap, delayPlay = 0, noOverlap?: boolean) => {
    if (noOverlap) {
      if (!this.soundMap[key]?.playing()) {
        delay(() => this.soundMap[key]?.play(), delayPlay);
      }
    } else {
      delay(() => this.soundMap[key]?.play(), delayPlay);
    }
  };

  playNoOverlap = (key: keyof ISoundMap, delayPlay = 0) => this.play(key, delayPlay, true);

  loop = (key: keyof ISoundMap) => {
    if (!this.soundMap[key]?.playing()) {
      this.soundMap[key]?.loop();
    }
  };

  fadeOut = (key: keyof ISoundMap, from = 100, to = 0, duration = 1000) =>
    this.soundMap[key]?.fade(from, to, duration);

  transition = (fromKey: keyof ISoundMap, toKey: keyof ISoundMap) => {
    this.fadeOut(fromKey, 100, 0, 1);
    this.play(toKey);
  };

  chain = () => new Chain(this);

  static self: SoundService;

  static singleton(): SoundService {
    if (!SoundService.self) {
      SoundService.self = new SoundService();
    }

    return SoundService.self;
  }
}

export default SoundService.singleton();
