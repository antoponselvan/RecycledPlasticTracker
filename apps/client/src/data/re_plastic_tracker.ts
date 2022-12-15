export type RePlasticTracker = {
  "version": "0.1.0",
  "name": "re_plastic_tracker",
  "instructions": [
    {
      "name": "addOrUpdateProduct",
      "accounts": [
        {
          "name": "initializer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "pdaAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "variant",
          "type": "u8"
        },
        {
          "name": "rePlasticPct",
          "type": "f32"
        },
        {
          "name": "serialNum",
          "type": "string"
        },
        {
          "name": "ingridientManufacturerKey",
          "type": "string"
        },
        {
          "name": "ingridientSerialNum",
          "type": "string"
        },
        {
          "name": "purchaserKey",
          "type": "string"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "productAccountState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "isInitialized",
            "type": "bool"
          },
          {
            "name": "rePlasticPct",
            "type": "f32"
          },
          {
            "name": "serialNum",
            "type": "string"
          },
          {
            "name": "ingridientManufacturerKey",
            "type": "string"
          },
          {
            "name": "ingridientSerialNum",
            "type": "string"
          },
          {
            "name": "purchaserKey",
            "type": "string"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "ProductInstruction",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "AddProduct",
            "fields": [
              {
                "name": "re_plastic_pct",
                "type": "f32"
              },
              {
                "name": "serial_num",
                "type": "string"
              },
              {
                "name": "ingridient_manufacturer_key",
                "type": "string"
              },
              {
                "name": "ingridient_serial_num",
                "type": "string"
              },
              {
                "name": "purchaser_key",
                "type": "string"
              }
            ]
          },
          {
            "name": "UpdateProduct",
            "fields": [
              {
                "name": "re_plastic_pct",
                "type": "f32"
              },
              {
                "name": "serial_num",
                "type": "string"
              },
              {
                "name": "ingridient_manufacturer_key",
                "type": "string"
              },
              {
                "name": "ingridient_serial_num",
                "type": "string"
              },
              {
                "name": "purchaser_key",
                "type": "string"
              }
            ]
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "UnInitializedAccount",
      "msg": "Account not yet initialized"
    },
    {
      "code": 6001,
      "name": "InvalidIngridient",
      "msg": "Cant link ingridient you have not bought"
    },
    {
      "code": 6002,
      "name": "InvalidDataLength",
      "msg": "Input exceeds max length"
    },
    {
      "code": 6003,
      "name": "InvalidRePlasticPct",
      "msg": "RePlastic Pct outside 0-100 range"
    }
  ]
};

export const IDL: RePlasticTracker = {
  "version": "0.1.0",
  "name": "re_plastic_tracker",
  "instructions": [
    {
      "name": "addOrUpdateProduct",
      "accounts": [
        {
          "name": "initializer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "pdaAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "variant",
          "type": "u8"
        },
        {
          "name": "rePlasticPct",
          "type": "f32"
        },
        {
          "name": "serialNum",
          "type": "string"
        },
        {
          "name": "ingridientManufacturerKey",
          "type": "string"
        },
        {
          "name": "ingridientSerialNum",
          "type": "string"
        },
        {
          "name": "purchaserKey",
          "type": "string"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "productAccountState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "isInitialized",
            "type": "bool"
          },
          {
            "name": "rePlasticPct",
            "type": "f32"
          },
          {
            "name": "serialNum",
            "type": "string"
          },
          {
            "name": "ingridientManufacturerKey",
            "type": "string"
          },
          {
            "name": "ingridientSerialNum",
            "type": "string"
          },
          {
            "name": "purchaserKey",
            "type": "string"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "ProductInstruction",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "AddProduct",
            "fields": [
              {
                "name": "re_plastic_pct",
                "type": "f32"
              },
              {
                "name": "serial_num",
                "type": "string"
              },
              {
                "name": "ingridient_manufacturer_key",
                "type": "string"
              },
              {
                "name": "ingridient_serial_num",
                "type": "string"
              },
              {
                "name": "purchaser_key",
                "type": "string"
              }
            ]
          },
          {
            "name": "UpdateProduct",
            "fields": [
              {
                "name": "re_plastic_pct",
                "type": "f32"
              },
              {
                "name": "serial_num",
                "type": "string"
              },
              {
                "name": "ingridient_manufacturer_key",
                "type": "string"
              },
              {
                "name": "ingridient_serial_num",
                "type": "string"
              },
              {
                "name": "purchaser_key",
                "type": "string"
              }
            ]
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "UnInitializedAccount",
      "msg": "Account not yet initialized"
    },
    {
      "code": 6001,
      "name": "InvalidIngridient",
      "msg": "Cant link ingridient you have not bought"
    },
    {
      "code": 6002,
      "name": "InvalidDataLength",
      "msg": "Input exceeds max length"
    },
    {
      "code": 6003,
      "name": "InvalidRePlasticPct",
      "msg": "RePlastic Pct outside 0-100 range"
    }
  ]
};
