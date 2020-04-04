import {
  validateURI,
  logSocialMediaShare,
  generateShortLink,
  generateShortLinkSuccess,
  generateShortLinkError,
  changeURI,
  changeDomain,
  changeSLink,
  resetFields,
  updateURL,
  updateURLSuccess,
  updateURLError,
  deleteLink,
  deleteLinkSuccess,
  deleteLinkError,
  archiveLink,
  archiveLinkSuccess,
  archiveLinkError,
  getLinkInfo,
  getLinkInfoSuccess,
  getLinkInfoError,
} from '../actions';
import {
  UPDATE_LINK,
  UPDATE_LINK_SUCCESS,
  UPDATE_LINK_ERROR,
  URI_VALIDATION,
  CHANGE_URI,
  CHANGE_DOMAIN,
  CHANGE_SLINK,
  GEN_SLINK,
  GEN_SLINK_SUCCESS,
  GEN_SLINK_ERROR,
  RESET_FIELDS,
  LOG_SOCIAL_SHARE,
  GET_LINK_INFO,
  GET_LINK_INFO_SUCCESS,
  GET_LINK_INFO_ERROR,
  ARCHIVE_LINK,
  ARCHIVE_LINK_SUCCESS,
  ARCHIVE_LINK_ERROR,
  DELETE_LINK,
  DELETE_LINK_SUCCESS,
  DELETE_LINK_ERROR,
} from '../constants';

describe('TableItemDialog actions', () => {
  describe('validateURI Action', () => {
    it('has a type of URI_VALIDATION and passes false for uriValidation with valid uri with no http(s):// and no www', () => {
      const result = false;
      const fixture = 'google.com';

      const expected = {
        type: URI_VALIDATION,
        uriValidation: result,
      };
      expect(validateURI(fixture)).toEqual(expected);
    });

    it('has a type of URI_VALIDATION and passes false for uriValidation with valid uri with http:// but no www', () => {
      const result = false;
      const fixture = 'http://google.com';

      const expected = {
        type: URI_VALIDATION,
        uriValidation: result,
      };
      expect(validateURI(fixture)).toEqual(expected);
    });

    it('has a type of URI_VALIDATION and passes false for uriValidation with valid uri with http:// and www', () => {
      const result = false;
      const fixture = 'http://www.google.com';

      const expected = {
        type: URI_VALIDATION,
        uriValidation: result,
      };
      expect(validateURI(fixture)).toEqual(expected);
    });

    it('has a type of URI_VALIDATION and passes false for uriValidation with valid uri with https:// and www', () => {
      const result = false;
      const fixture = 'https://www.google.com';

      const expected = {
        type: URI_VALIDATION,
        uriValidation: result,
      };
      expect(validateURI(fixture)).toEqual(expected);
    });

    it('has a type of URI_VALIDATION and passes error message for uriValidation with invalid uri with no TLD', () => {
      const result = 'Enter a valid URL';
      const fixture = 'google';

      const expected = {
        type: URI_VALIDATION,
        uriValidation: result,
      };
      expect(validateURI(fixture)).toEqual(expected);
    });

    it('has a type of URI_VALIDATION and passes error message for uriValidation with invalid uri with symbols', () => {
      const result = 'Enter a valid URL';
      const fixture = '$google.com';

      const expected = {
        type: URI_VALIDATION,
        uriValidation: result,
      };
      expect(validateURI(fixture)).toEqual(expected);
    });

    it('has a type of URI_VALIDATION and passes error message for uriValidation with invalid uri with symbols', () => {
      const result = 'Enter a valid URL';
      const fixture = '$google.com';

      const expected = {
        type: URI_VALIDATION,
        uriValidation: result,
      };
      expect(validateURI(fixture)).toEqual(expected);
    });
  });

  describe('logSocialMediaShare Action', () => {
    it('should return type of LOG_SOCIAL_SHARE and pass media', () => {
      const fixture = 'facebook';

      const expected = {
        type: LOG_SOCIAL_SHARE,
        media: fixture,
      };

      expect(logSocialMediaShare(fixture)).toEqual(expected);
    });
  });

  describe('generateShortLink Action', () => {
    it('should return type of GEN_SLINK', () => {
      const expected = {
        type: GEN_SLINK,
      };

      expect(generateShortLink()).toEqual(expected);
    });
  });

  describe('generateShortLinkSuccess Action', () => {
    it('should return type of GEN_SLINK_SUCCESS and pass sLink', () => {
      const fixture = 'a1s3fc';
      const expected = {
        type: GEN_SLINK_SUCCESS,
        sLink: fixture,
      };

      expect(generateShortLinkSuccess(fixture)).toEqual(expected);
    });
  });

  describe('generateShortLinkError Action', () => {
    it('should return type of GEN_SLINK_ERROR and pass sLinkError', () => {
      const fixture = 'error';
      const expected = {
        type: GEN_SLINK_ERROR,
        sLinkError: fixture,
      };

      expect(generateShortLinkError(fixture)).toEqual(expected);
    });
  });

  describe('changeURI Action', () => {
    it('should return type of CHANGE_URI and pass uri', () => {
      const fixture = 'google.com';
      const expected = {
        type: CHANGE_URI,
        uri: fixture,
      };

      expect(changeURI(fixture)).toEqual(expected);
    });
  });

  describe('changeDomain Action', () => {
    it('should return type of CHANGE_DOMAIN and pass domain', () => {
      const fixture = 'google.com';
      const expected = {
        type: CHANGE_DOMAIN,
        domain: fixture,
      };

      expect(changeDomain(fixture)).toEqual(expected);
    });
  });

  describe('changeSLink Action', () => {
    it('should return type of CHANGE_SLINK and pass sLink', () => {
      const fixture = '1234abcd';
      const expected = {
        type: CHANGE_SLINK,
        sLink: fixture,
      };

      expect(changeSLink(fixture)).toEqual(expected);
    });
  });

  describe('resetFields Action', () => {
    it('should return type of RESET_FIELDS', () => {
      const expected = {
        type: RESET_FIELDS,
      };

      expect(resetFields()).toEqual(expected);
    });
  });

  describe('updateURL Action', () => {
    it('should return type of UPDATE_LINK', () => {
      const expected = {
        type: UPDATE_LINK,
      };

      expect(updateURL()).toEqual(expected);
    });
  });

  describe('updateURLSuccess Action', () => {
    it('should return type of UPDATE_LINK_SUCCESS and pass currentLink', () => {
      const fixture = {
        uri: 'google.com',
      };

      const expected = {
        type: UPDATE_LINK_SUCCESS,
        currentLink: fixture,
      };

      expect(updateURLSuccess(fixture)).toEqual(expected);
    });
  });

  describe('updateURLError Action', () => {
    it('should return type of UPDATE_LINK_ERROR and pass error', () => {
      const fixture = 'error';

      const expected = {
        type: UPDATE_LINK_ERROR,
        error: fixture,
      };

      expect(updateURLError(fixture)).toEqual(expected);
    });
  });

  describe('deleteLink Action', () => {
    it('should return type of DELETE_LINK', () => {
      const expected = {
        type: DELETE_LINK,
      };

      expect(deleteLink()).toEqual(expected);
    });
  });

  describe('deleteLinkSuccess Action', () => {
    it('should return type of DELETE_LINK_SUCCESS and pass deletedLink', () => {
      const fixture = {
        uri: 'google.com',
      };

      const expected = {
        type: DELETE_LINK_SUCCESS,
        deletedLink: fixture,
      };

      expect(deleteLinkSuccess(fixture)).toEqual(expected);
    });
  });

  describe('deleteLinkError Action', () => {
    it('should return type of DELETE_LINK_ERROR and pass error', () => {
      const fixture = 'error';

      const expected = {
        type: DELETE_LINK_ERROR,
        error: fixture,
      };

      expect(deleteLinkError(fixture)).toEqual(expected);
    });
  });

  describe('archiveLink Action', () => {
    it('should return type of ARCHIVE_LINK', () => {
      const expected = {
        type: ARCHIVE_LINK,
      };

      expect(archiveLink()).toEqual(expected);
    });
  });

  describe('archiveLinkSuccess Action', () => {
    it('should return type of ARCHIVE_LINK_SUCCESS and pass newLink', () => {
      const fixture = {
        uri: 'google.com',
      };

      const expected = {
        type: ARCHIVE_LINK_SUCCESS,
        newLink: fixture,
      };

      expect(archiveLinkSuccess(fixture)).toEqual(expected);
    });
  });

  describe('archiveLinkError Action', () => {
    it('should return type of ARCHIVE_LINK_ERROR and pass error', () => {
      const fixture = 'error';

      const expected = {
        type: ARCHIVE_LINK_ERROR,
        error: fixture,
      };

      expect(archiveLinkError(fixture)).toEqual(expected);
    });
  });

  describe('getLinkInfo Action', () => {
    it('should return type of GET_LINK_INFO', () => {
      const expected = {
        type: GET_LINK_INFO,
      };

      expect(getLinkInfo()).toEqual(expected);
    });
  });

  describe('getLinkInfoSuccess Action', () => {
    it('should return type of GET_LINK_INFO_SUCCESS', () => {
      const fixture = {
        counts: 5,
      };
      const expected = {
        type: GET_LINK_INFO_SUCCESS,
        linkInfo: fixture,
      };

      expect(getLinkInfoSuccess(fixture)).toEqual(expected);
    });
  });

  describe('getLinkInfoError Action', () => {
    it('should return type of GET_LINK_INFO_ERROR', () => {
      const fixture = 'error';

      const expected = {
        type: GET_LINK_INFO_ERROR,
        error: fixture,
      };

      expect(getLinkInfoError(fixture)).toEqual(expected);
    });
  });
});
