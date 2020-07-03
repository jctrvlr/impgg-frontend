import {
  validateURI,
  resetState,
  logSocialMediaShare,
  generateShortLink,
  generateShortLinkSuccess,
  generateShortLinkError,
  changeURI,
  changeDomain,
  changeSLink,
  resetFields,
  updateURL,
  updateURLError,
  updateURLSuccess,
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
  RESET_STATE,
} from '../constants';

describe('TableItemDialog actions', () => {
  describe('validateURI Action', () => {
    it('has a type of URI_VALIDATION and returns false if a valid URI', () => {
      const expected = {
        type: URI_VALIDATION,
        uriValidation: false,
      };
      expect(validateURI('https://www.google.com')).toEqual(expected);
    });

    it('has a type of URI_VALIDATION and returns error if an invalid URI', () => {
      const expected = {
        type: URI_VALIDATION,
        uriValidation: 'Enter a valid URL',
      };
      expect(validateURI('wwwgooglecom')).toEqual(expected);
    });
  });

  describe('resetState', () => {
    it('has a type of RESET_STATE', () => {
      const expected = {
        type: RESET_STATE,
      };
      expect(resetState()).toEqual(expected);
    });
  });

  describe('logSocialMediaShare', () => {
    it('has a type of LOG_SOCIAL_SHARE', () => {
      const expected = {
        type: LOG_SOCIAL_SHARE,
        media: 'facebook',
      };
      expect(logSocialMediaShare('facebook')).toEqual(expected);
    });
  });

  describe('generateShortLink', () => {
    it('has a type of GEN_SLINK', () => {
      const expected = {
        type: GEN_SLINK,
      };
      expect(generateShortLink()).toEqual(expected);
    });
  });

  describe('generateShortLinkSuccess', () => {
    it('has a type of GEN_SLINK_SUCCESS and passes sLink', () => {
      const expected = {
        type: GEN_SLINK_SUCCESS,
        sLink: 'abcdef',
      };
      expect(generateShortLinkSuccess('abcdef')).toEqual(expected);
    });
  });

  describe('generateShortLinkError', () => {
    it('has a type of GEN_SLINK_ERROR and passes sLinkError', () => {
      const expected = {
        type: GEN_SLINK_ERROR,
        sLinkError: 'error',
      };
      expect(generateShortLinkError('error')).toEqual(expected);
    });
  });

  describe('changeURI', () => {
    it('has a type of CHANGE_URI and passes uri', () => {
      const expected = {
        type: CHANGE_URI,
        uri: 'domain.com',
      };
      expect(changeURI('domain.com')).toEqual(expected);
    });
  });

  describe('changeDomain', () => {
    it('has a type of CHANGE_DOMAIN and passes domain', () => {
      const expected = {
        type: CHANGE_DOMAIN,
        domain: 'domain.com',
      };
      expect(changeDomain('domain.com')).toEqual(expected);
    });
  });

  describe('changeSLink', () => {
    it('has a type of CHANGE_SLINK and passes sLink', () => {
      const expected = {
        type: CHANGE_SLINK,
        sLink: '123abc',
      };
      expect(changeSLink('123abc')).toEqual(expected);
    });
  });

  describe('resetFields', () => {
    it('has a type of RESET_FIELDS', () => {
      const expected = {
        type: RESET_FIELDS,
      };
      expect(resetFields()).toEqual(expected);
    });
  });

  describe('updateURL', () => {
    it('has a type of UPDATE_LINK', () => {
      const expected = {
        type: UPDATE_LINK,
      };
      expect(updateURL()).toEqual(expected);
    });
  });

  describe('updateURLSuccess', () => {
    it('has a type of UPDATE_LINK_SUCCESS and passes currentLink', () => {
      const expected = {
        type: UPDATE_LINK_SUCCESS,
        currentLink: { uri: 'uri.com', id: '123abc' },
      };
      expect(updateURLSuccess({ uri: 'uri.com', id: '123abc' })).toEqual(
        expected,
      );
    });
  });

  describe('updateURLError', () => {
    it('has a type of UPDATE_LINK_ERROR and passes error', () => {
      const expected = {
        type: UPDATE_LINK_ERROR,
        error: 'error',
      };
      expect(updateURLError('error')).toEqual(expected);
    });
  });

  describe('deleteLink', () => {
    it('has a type of DELETE_LINK', () => {
      const expected = {
        type: DELETE_LINK,
      };
      expect(deleteLink()).toEqual(expected);
    });
  });

  describe('deleteLinkSuccess', () => {
    it('has a type of DELETE_LINK_SUCCESS and passes deletedLink', () => {
      const expected = {
        type: DELETE_LINK_SUCCESS,
        deletedLink: { uri: 'uri.com', id: '123abc' },
      };
      expect(deleteLinkSuccess({ uri: 'uri.com', id: '123abc' })).toEqual(
        expected,
      );
    });
  });

  describe('deleteLinkError', () => {
    it('has a type of DELETE_LINK_ERROR and passes error', () => {
      const expected = {
        type: DELETE_LINK_ERROR,
        error: 'error',
      };
      expect(deleteLinkError('error')).toEqual(expected);
    });
  });

  describe('archiveLink', () => {
    it('has a type of ARCHIVE_LINK', () => {
      const expected = {
        type: ARCHIVE_LINK,
      };
      expect(archiveLink()).toEqual(expected);
    });
  });

  describe('archiveLinkSuccess', () => {
    it('has a type of ARCHIVE_LINK_SUCCESS and passes newLink', () => {
      const expected = {
        type: ARCHIVE_LINK_SUCCESS,
        newLink: { uri: 'uri.com', id: '123abc' },
      };
      expect(archiveLinkSuccess({ uri: 'uri.com', id: '123abc' })).toEqual(
        expected,
      );
    });
  });

  describe('archiveLinkError', () => {
    it('has a type of ARCHIVE_LINK_ERROR and passes error', () => {
      const expected = {
        type: ARCHIVE_LINK_ERROR,
        error: 'error',
      };
      expect(archiveLinkError('error')).toEqual(expected);
    });
  });

  describe('getLinkInfo', () => {
    it('has a type of GET_LINK_INFO', () => {
      const expected = {
        type: GET_LINK_INFO,
      };
      expect(getLinkInfo()).toEqual(expected);
    });
  });

  describe('getLinkInfoSuccess', () => {
    it('has a type of GET_LINK_INFO_SUCCESS and passes linkInfo', () => {
      const expected = {
        type: GET_LINK_INFO_SUCCESS,
        linkInfo: { clicks: 123 },
      };
      expect(getLinkInfoSuccess({ clicks: 123 })).toEqual(expected);
    });
  });

  describe('getLinkInfoError', () => {
    it('has a type of GET_LINK_INFO_ERROR and passes error', () => {
      const expected = {
        type: GET_LINK_INFO_ERROR,
        error: 'error',
      };
      expect(getLinkInfoError('error')).toEqual(expected);
    });
  });
});
