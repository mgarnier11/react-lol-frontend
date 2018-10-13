import React from 'react';
import { Line, Circle } from 'rc-progress';

class Utils {
    static renderCircle(percent) {
        if (!isNaN(percent)) {
            var color = 0;
            if (percent > 40) color = Math.round(percent * 5 - 200)
            return (
                <div className="percentCircle">
                    <Circle className="circle" percent={percent} strokeWidth="9" strokeColor={'hsl(' + color + ',100%,50%)'} >test</Circle>
                    <span>{percent} %</span>
                </div>
            )
        }
    }

    static renderBar(points) {
        if (!isNaN(points)) {
            return (
                <Line percent={(points > 100 ? 100 : points)} strokeWidth="3" />
            )
        }
    }

    static kdaColor(kda) {
        var color = 0
        if (kda > 1) color = Math.round(kda * 50 - 50);
        if (color > 300) color = 300;
        return 'hsl(' + color + ',100%,50%)';
    }


    static killColor(kill) {
        var color = 0
        color = Math.round(kill * 50 / 3);
        if (color > 300) color = 300;
        return 'hsl(' + color + ',100%,50%)';
    }

    static deathColor(death) {
        var color = 300;
        color = Math.round(-45 * death + 300);
        if (color < 0) color = 0;
        return 'hsl(' + color + ',100%,50%)';
    }
    /*{'hsl(' + (points * 120 / 100) + ',100%,50%)'}*/
}
export default Utils