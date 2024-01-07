export interface IPublisher<Data> {
  publish(data: Data): Promise<void>;
}
