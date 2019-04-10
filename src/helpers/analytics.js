/* eslint-disable no-undef */
import { Settings } from 'sketch';
import { isProd } from './environment';

const kUUIDKey = 'google.analytics.uuid';
let uuid = Settings.globalSettingForKey(kUUIDKey);
if (!uuid) {
  uuid = NSUUID.UUID().UUIDString();
  Settings.setGlobalSettingForKey(uuid, kUUIDKey);
}

function jsonToQueryString(json) {
  return Object.keys(json)
    .map((key) => {
      return `${encodeURIComponent(key)}=${encodeURIComponent(json[key])}`;
    })
    .join('&');
}

const track = (trackingId, hitType, props) => {
  if (!isProd()) {
    return;
  }

  if (!Settings.globalSettingForKey('analyticsEnabled')) {
    // the user didn't enable sharing analytics
    return;
  }

  const payload = {
    v: 1,
    tid: trackingId,
    cid: uuid,
    t: hitType,
  };

  if (props) {
    Object.keys(props).forEach((key) => {
      payload[key] = props[key];
    });
  }

  const url = NSURL.URLWithString(`https://www.google-analytics.com/collect?${jsonToQueryString(payload)}`);

  if (url) {
    NSURLSession.sharedSession()
      .dataTaskWithURL(url)
      .resume();
  }
};

const trackAppStart = (trackingId) => {
  track(trackingId, 'event', {
    ec: 'application',
    ea: 'start',
  });
};

export { track, trackAppStart };
