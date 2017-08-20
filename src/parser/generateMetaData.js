import fs from 'fs-sync';

export default function generateMetaData({ dir }) {
  const pkg = JSON.parse(fs.read('./package.json'));
  console.log('pkg', pkg);
  const meta = {
    "date": new Date(),
    "project": {
      ...pkg,
      "stats": {
        "files": [
          {
            "type": "reactComponent",
            "label": "React Components",
            "count": 3
          },
          {
            "type": "nodeModule",
            "label": "Node Modules",
            "count": 3
          }
        ]
      }
    }
  };
  return meta;
}
