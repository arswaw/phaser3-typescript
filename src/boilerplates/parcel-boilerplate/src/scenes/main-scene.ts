import * as Phaser from 'phaser';
import { Redhat } from '../objects/redhat';

export class MainScene extends Phaser.Scene {
  private myRedhat!: Redhat;

  constructor() {
    super({ key: 'MainScene' });
  }

  preload(): void {
    // Without constructing these URLs in this specific way, Parcel will not import
    // the images or any other assets from the static folder.
    this.load.image('redhat', new URL("/static/images/redhat.png", import.meta.url).toString());
    this.load.image('redParticle', new URL("/static/images/red.png", import.meta.url).toString());
  }

  create(): void {
    const emitter = this.add.particles(100, 300, 'redParticle', {
      angle: { min: -30, max: 30 },
      speed: 100,
      scale: { start: 0.5, end: 0 },
      blendMode: 'ADD'
    });

    this.myRedhat = new Redhat({
      scene: this,
      x: 400,
      y: 300,
      texture: 'redhat'
    });

    emitter.startFollow(this.myRedhat);
  }
}
