
import { withPluginApi } from "discourse/lib/plugin-api";
import discourseComputed, { on } from "discourse-common/utils/decorators";

export default {
  name: "topic-timer-mod",
  initialize(container) {
    momentDurationFormatSetup(moment);
    withPluginApi("0.10.0", (api) => {
      api.modifyClass("component:topic-timer-info", {
        rerenderDelay(timeLeft) {
          return settings.rerender_time;
        },

        additionalOpts() {
          let statusUpdateAt = moment(this.executeAt);
          let duration = moment.duration(statusUpdateAt - moment());
          const finalOpts = {
            timeLeft: I18n.t(themePrefix("delimiter"))+" "+duration.format(settings.duration_format),
          }

          return finalOpts;
        }
      });
    });
  }
}