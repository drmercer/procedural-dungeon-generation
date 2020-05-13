export abstract class Feature {
  public abstract isObstacle(): boolean;
}

export class Goal extends Feature {
  isObstacle = () => false
}
