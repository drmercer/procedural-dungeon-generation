export abstract class Stepper {
  public abstract tick(): Promise<void>;
  public abstract step(): Promise<void>;
}

export abstract class NoopStepper {
  public async tick() { };
  public async step() { };
}

export class AnimationStepper extends Stepper {
  constructor(
    private drawFn: () => Promise<void>,
    private frameDurationMs = 50,
    private stepFrameCount = 10,
  ) {
    super();
  }

  public async tick(): Promise<void> {
    await this.drawFn();
    return new Promise(res => setTimeout(res, this.frameDurationMs));
  }
  public async step(): Promise<void> {
    await this.drawFn();
    return new Promise(res => setTimeout(res, this.frameDurationMs * this.stepFrameCount));
  }
}
