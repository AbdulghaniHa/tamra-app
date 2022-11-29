export function csv2json (data: string, delimiter = ',') {
    const titles = data.slice(0, data.indexOf('\n')).split(delimiter);
    return data
      .slice(data.indexOf('\n') + 1)
      .split('\n')
      .map((v: any) => {
        const values = v.split(delimiter);
        return titles.reduce(
          (obj: any, title: any, index: any) => ((obj[title] = values[index]), obj),
          {}
        );
      });
  };
