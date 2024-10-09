export default class DATE {
  /**
   * Set date format
   *
   * @param { string | Date } date - The date value
   * @param { string } format - The format date.
   * @param { object } options - The option object.
   * @returns { string } - The formatted date string.
   * @coder Doun Da
   *
   */

  public static setDateFormat(
    date: string | Date,
    format: "DD-MM-YYYY" | "HH:mm:ss" | "DD-MM-YYYY HH:mm:ss" | string,
    options: any = {}
  ): string {
    // # is date empty
    if (!date) {
      return "";
    }

    // # Transform
    if (
      typeof date == "string" &&
      (date.includes(" AM") || date.includes(" PM"))
    ) {
      const splitDate = date.split(" ");
      if (splitDate.length == 3) {
        date = new Date(
          this.setDateFormat(splitDate[0], "YYYY-MM-DD") +
            " " +
            splitDate[1] +
            " " +
            splitDate[2]
        );
      }
      if (splitDate.length == 2) {
        date = new Date("1993-09-01" + " " + splitDate[1] + " " + splitDate[2]);
      }
    }

    if (typeof date == "string") {
      date = date.replace(/\D/g, "");
    }

    // # Assignment by type
    let year = "",
      month = "",
      day = "",
      hour = "00",
      ampm = "",
      minute = "00",
      second = "00",
      millisecond = "000";

    if (date instanceof Date) {
      year = date.getFullYear().toString();
      month = (date.getMonth() + 1).toString().padStart(2, "0");
      day = date.getDate().toString().padStart(2, "0");
      hour = date.getHours().toString().padStart(2, "0");
      minute = date.getMinutes().toString().padStart(2, "0");
      second = date.getSeconds().toString().padStart(2, "0");
      millisecond = date.getMilliseconds().toString().padStart(3, "0");
    } else if (this.getDateFormat(date).indexOf("DDMMYYYY") == 0) {
      year = date.substring(4, 8);
      month = date.substring(2, 4);
      day = date.substring(0, 2);
      hour = date.substring(8, 10) || hour;
      minute = date.substring(10, 12) || minute;
      second = date.substring(12, 14) || second;
    } else if (this.getDateFormat(date).indexOf("YYYYMMDD") == 0) {
      year = date.substring(0, 4);
      month = date.substring(4, 6);
      day = date.substring(6, 8);
      hour = date.substring(8, 10) || hour;
      minute = date.substring(10, 12) || minute;
      second = date.substring(12, 14) || second;
    } else if (this.getDateFormat(date) == "HHmmss") {
      hour = date.substring(0, 2) || hour;
      minute = date.substring(2, 6) || minute;
      second = date.substring(6, 8) || second;
    }

    // # Cook
    if (hour && options.hour12) {
      ampm = +hour >= 12 ? "PM" : "AM";
      hour = (+hour % 12 ? hour : 12).toString();
    }

    // # Applying format
    if (format.indexOf("SSS") > -1) {
      format = format.replace("SSS", millisecond);
    }
    if (format.indexOf("ss") > -1) {
      format = format.replace("ss", second);
    }
    if (format.indexOf("mm") > -1) {
      format = format.replace("mm", minute);
    }
    if (format.indexOf("HH") > -1) {
      format = format.replace("HH", hour);
    }
    if (format.indexOf("DD") > -1) {
      format = format.replace("DD", day);
    }
    if (format.indexOf("MMMM") > -1) {
      const d = new Date();
      d.setMonth(+month - 1);
      format = format.replace(
        "MMM",
        d.toLocaleString("en-US", { month: "long" })
      );
    }
    if (format.indexOf("MMM") > -1) {
      const d = new Date();
      d.setMonth(+month - 1);
      format = format.replace(
        "MMM",
        d.toLocaleString("en-US", { month: "short" })
      );
    }
    if (format.indexOf("MM") > -1) {
      format = format.replace("MM", month);
    }
    if (format.indexOf("YYYY") > -1) {
      format = format.replace("YYYY", year);
    }
    if (hour && options.hour12) {
      format += " " + ampm;
    }

    // #
    return format.trim();
  }

  /**
   * Get date format from given value
   *
   * @param {string} date
   * @returns {string}
   * @coder Doun Da
   */
  public static getDateFormat(date: string): string {
    const formats = {
      YYYYMMDD: /^\d{4}[01]\d[0-3]\d$/,
      YYYYMMDDHHmm: /^\d{4}[01]\d[0-3]\d[0-2]\d[0-5]\d$/,
      YYYYMMDDHHmmss: /^\d{4}[01]\d[0-3]\d[0-2]\d[0-5]\d[0-5]\d$/,
      DDMMYYYY: /^[0-3]\d[01]\d\d{4}$/,
      DDMMYYYYHHmm: /^[0-3]\d[01]\d\d{4}[0-2]\d[0-5]\d$/,
      DDMMYYYYHHmmss: /^[0-3]\d[01]\d\d{4}[0-2]\d[0-5]\d[0-5]\d$/,
      HHmmss: /^([01]\d|2[0-3])[0-5]\d[0-5]\d$/,
    } as any;

    for (const format of Object.keys(formats)) {
      if (formats[format].test(date)) {
        return format;
      }
    }
    return "";
  }

  /**
   * Convert date to date string
   *
   * @param {string} date
   * @returns {string}
   * @coder Doun Da
   */

  public static getDateFormatToString(date: string): string {
    return date.replace(/-/g, "");
  }
}
