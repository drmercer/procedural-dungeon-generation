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
    private frameDurationMs = 500,
    private stepFrameCount = 10,
  ) {
    super();
  }

  public async tick(): Promise<void> {
    return new Promise(res => setTimeout(res, this.frameDurationMs));
  }
  public async step(): Promise<void> {
    return new Promise(res => setTimeout(res, this.frameDurationMs * this.stepFrameCount));
  }
}
