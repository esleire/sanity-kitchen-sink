import { SyncIcon } from '@sanity/icons'
import { useToast } from "@sanity/ui";

function SyncToTest(props) {
  const { draft } = props;
  const toast = useToast();

  return {
    label: 'Sync to test',
    icon: SyncIcon,
    onHandle: () => {

      var id = props.id;

      if (draft != null) {
        id = "drafts." + id;
      }

      fetch(`http://localhost:3000/import/document/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        mode: 'no-cors' // Fix
      })
        .then((response) => response.status)
        .then((res) => {
          console.log(res)
          const success = res === 200 || res === 304;
          const msg = {
            status: success ? "success" : "error",
            title: success ? "Changes synced" : "Could not sync changes",
          };
          toast.push(msg);
        })
        .catch((error) => {
          toast.push({
            status: "error",
            title: error.message,
          });
        })
        .finally(() => {
          props.onComplete();
        });

    }
  }
}

export default SyncToTest; 
