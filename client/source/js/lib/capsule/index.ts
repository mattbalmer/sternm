class Capsule {
  private prefix: string;
  private keys: Set<string>;

  constructor(prefix: string, data: Object) {
    this.prefix = prefix || '';
    this.keys = new Set();

    this.setDefaults(data);
    this.sync();
  }

  private setDefaults(data: Object = {}) {
    for(let key in data) {
      if(data.hasOwnProperty(key) && !this.has(key)) {
        this.set(key, data[key]);
      }
    }
  }

  private sync() {
    for(let pre_key in localStorage) {
      if(localStorage.hasOwnProperty(pre_key)) {
        if(pre_key.indexOf(this.prefix) == 0) {
          let key = this.unprefixKey_(pre_key);
          this.keys.add(key);
        }
      }
    }
  }

  private unprefixKey_(pre_key: string): string {
    return pre_key.replace(new RegExp(`${this.prefix}_`), '');
  }

  private prefixKey_(key: string): string {
    return `${this.prefix}_${key}`;
  }

  public has(key: string): boolean {
    const pre_key = this.prefixKey_(key);

    return localStorage.hasOwnProperty(pre_key);
  }

  public set(key: string, value: any): void {
    const pre_key = this.prefixKey_(key);
    this.keys.add(key);

    try {
      localStorage.setItem(pre_key, JSON.stringify({'__data__': value}));
    } catch (e) {
      console.warn(`Capsule didn't successfully save the '{ ${key}: ${value} }' pair, because the localStorage is full.`);
    }
  }

  public get<T>(key: string, default_: T = undefined): T {
    const pre_key = this.prefixKey_(key);
    let value;

    if(!localStorage.hasOwnProperty(pre_key)) {
      return default_;
    }

    try {
      let raw = JSON.parse(localStorage.getItem(pre_key));
      value = raw.__data__;
      return value;
    } catch (e) {
      console.warn(`Capsule could not load the item with key: ${key}`);
      return default_;
    }
  }

  public remove(key: string): void {
    const pre_key = this.prefixKey_(key);
    this.keys.delete(key);

    localStorage.removeItem(pre_key);
  }

  public flush() {
    Array.from(this.keys).forEach((key: string) => {
      this.remove(key);
    });
  }
}

export { Capsule };